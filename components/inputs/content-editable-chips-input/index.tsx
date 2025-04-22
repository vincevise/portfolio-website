import {
    useEffect,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
  } from "react";
  
  export interface ContentEditableChipType {
    chipLabel: string;
    value: string;
    logo_url?: string;
  }
  
  export interface ParsedContentItem {
    value: string;
    chipLabel?: string;
    type: "text" | "chip";
    logo_url?: string;
  }
  
  type Props = {
    parsedContentValue: ParsedContentItem[];
    onChange: (parsedContent: ParsedContentItem[]) => void;
  };
  export interface ContentEditableChipInputRef {
    insertChip: (chip: ContentEditableChipType) => void;
  }
  
  const chip_class = "inline-flex  text-xs text-gray-800 gap-2 px-1 py-0.5 pr-6 rounded border-2 border-gray-300  whitespace-nowrap relative  items-center"
  
  // Function to parse content into array of text and chip objects
  const parseContent = (htmlContent: string): ParsedContentItem[] => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
  
    const result: ParsedContentItem[] = [];
  
    const processNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (text) {
          const lines = text.split(/\n/);
          lines.forEach((line, index) => {
            if (line.trim()) {
              result.push({ value: line, type: "text" });
            }
            // Always add a newline after each line, except for the last line if it's empty
            if (index < lines.length - 1 || (index === lines.length - 1 && line.trim() === '')) {
              result.push({ value: '\n', type: "text" });
            }
          });
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
  
        // Handle BR elements
        if (element.tagName === 'BR') {
          result.push({ value: '\n', type: "text" });
          return;
        }
  
        // Check if this is a chip element
        if (element.dataset.chipId) {
          const chipLabel = element.textContent?.replace("×", "").trim();
          if (chipLabel) {
            result.push({
              value: element.dataset.chipId,
              chipLabel,
              type: "chip",
              logo_url: element.querySelector('img')?.getAttribute('src') || undefined
            });
          }
        } else {
          // Process child nodes for non-chip elements
          Array.from(element.childNodes).forEach(processNode);
        }
      }
    };
  
    Array.from(tempDiv.childNodes).forEach(processNode);
    return result;
  };
   
  
  const ContentEditableWithPresetChips = forwardRef<
    ContentEditableChipInputRef,
    Props
  >(({ parsedContentValue, onChange }, ChildRef) => {
    const [content, setContent] = useState("");
    const contentEditableRef = useRef<HTMLDivElement>(null);
    const selection = useRef<{
      anchorNode: Node | null;
      anchorOffset: number;
    } | null>(null);
  
    const [isInitialized, setIsInitialized] = useState(false);
  
    // Handle input in the content editable div
    const handleInput = () => {
      if (contentEditableRef.current) {
        setContent(contentEditableRef.current.innerHTML);
  
        // Store current selection
        const sel = document.getSelection();
        if (sel && sel.anchorNode) {
          selection.current = {
            anchorNode: sel.anchorNode,
            anchorOffset: sel.anchorOffset,
          };
        }
      }
    };
  
    // Save the current selection when the div is clicked
    const handleContentClick = () => {
      const sel = document.getSelection();
      if (sel && sel.anchorNode) {
        selection.current = {
          anchorNode: sel.anchorNode,
          anchorOffset: sel.anchorOffset,
        };
      }
    };
  
    // Add a chip at the current cursor position
    const addChip = (chip: ContentEditableChipType) => {
      // Save the current selection if the div is active
      if (document.activeElement === contentEditableRef.current) {
        const sel = document.getSelection();
        if (sel && sel.rangeCount > 0) {
          selection.current = {
            anchorNode: sel.anchorNode,
            anchorOffset: sel.anchorOffset,
          };
        }
      }
  
      const chipElement = document.createElement("span");
      chipElement.contentEditable = "false";
      chipElement.dataset.chipId = chip.value;
      chipElement.className = chip_class;
  
      if(chip.logo_url){
          // Create a chip element
          const logoElement = document.createElement("img");
          logoElement.src = chip.logo_url || "";
          logoElement.className = "w-3 h-3";
          chipElement.appendChild(logoElement);
      }
  
      // Create inner content
      const textNode = document.createTextNode(chip.chipLabel);
      chipElement.appendChild(textNode);
  
      // Create delete button for the chip
      const deleteButton = document.createElement("button");
      deleteButton.className = "ml-1 font-bold text-lg absolute right-2";
      deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12" height="12" viewBox="0 0 50 50">
  <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
  </svg>`;
      deleteButton.onclick = function (e) {
        e.stopPropagation();
        chipElement.remove();
        handleInput(); // Update content state after removal
      };
      chipElement.appendChild(deleteButton);
  
      // Insert the chip at cursor position or at the end
      if (selection.current && contentEditableRef.current) {
        const range = document.createRange();
        const sel = window.getSelection();
  
        try {
          range.setStart(
            selection.current?.anchorNode || contentEditableRef.current,
            selection.current?.anchorOffset || 0
          );
          range.collapse(true);
          range.insertNode(chipElement);
  
          // Move cursor after the chip
          range.setStartAfter(chipElement);
          range.collapse(true);
  
          sel?.removeAllRanges();
          sel?.addRange(range);
  
          // Add a space after the chip
          const spaceNode = document.createTextNode("\u00A0");
          range.insertNode(spaceNode);
          range.setStartAfter(spaceNode);
          range.collapse(true);
          sel?.removeAllRanges();
          sel?.addRange(range);
        } catch {
          // Fallback: append to the end
          contentEditableRef.current.appendChild(chipElement);
          contentEditableRef.current.appendChild(
            document.createTextNode("\u00A0")
          );
        }
      } else if (contentEditableRef.current) {
        // Fallback: append to the end
        contentEditableRef.current.appendChild(chipElement);
        contentEditableRef.current.appendChild(document.createTextNode("\u00A0"));
      }
  
      // Update content state
      handleInput();
  
      // Focus back on content editable
      contentEditableRef.current?.focus();
    };
  
    useImperativeHandle(ChildRef, () => ({
      insertChip: (chip: ContentEditableChipType) => {
        addChip(chip);
      },
    }));
  
    // Initialize content from parsedContentValue when it changes
    useEffect(() => {
      const initializeContent = async () => {
        // Skip initialization if content matches current state
        if (contentEditableRef.current) {
          const currentContent = parseContent(contentEditableRef.current.innerHTML);
          const currentString = JSON.stringify(currentContent);
          const newString = JSON.stringify(parsedContentValue);
          if (currentString === newString) {
            return;
          }
        }
        if (contentEditableRef.current) {
          contentEditableRef.current.innerHTML = "";
          parsedContentValue.forEach(async (item) => {
            if (item.type === "text") {
              const textNode =  document.createTextNode(item.value);
              contentEditableRef.current?.appendChild(textNode);
            } else if (item.type === "chip") {
              // Create a chip element
              const chipElement = document.createElement("span");
              chipElement.className = chip_class;
              chipElement.contentEditable = "false";
              chipElement.dataset.chipId = item.value;
  
              if(item.logo_url){
                // Create a chip element
                const logoElement = document.createElement("img");
                logoElement.src = item.logo_url || "";
                logoElement.className = "w-3 h-3";
                chipElement.appendChild(logoElement);
            }
  
              // Create inner content
              const textNode = document.createTextNode(item.chipLabel!);
              chipElement.appendChild(textNode);
  
              // Create delete button for the chip
              const deleteButton = document.createElement("button");
              deleteButton.className = "ml-1 font-bold text-lg absolute right-2";
              deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12" height="12" viewBox="0 0 50 50">
  <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
  </svg>`;
              deleteButton.onclick = function (e) {
                e.stopPropagation();
                chipElement.remove();
                handleInput(); // Update content state after removal
              };
              chipElement.appendChild(deleteButton);
              contentEditableRef.current?.appendChild(chipElement);
            }
          });
          // setContent(htmlContent);
        }
      };
      if (!isInitialized) {
          initializeContent();
        setIsInitialized(true);
      }
    }, [parsedContentValue]);
  
    useEffect(() => {
      const newParsedContent = parseContent(content);
      if (isInitialized) {
        onChange(newParsedContent);
      }
    }, [content, onChange]);
  
  
    return (
      <>
        <div
          ref={contentEditableRef}
          className="font-medium min-h-[30px] h-auto max-h-32 overflow-y-auto text-xs focus:outline-none text-wrap
    focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full p-1.5 border border-gray-400 rounded  "
          contentEditable
          onInput={handleInput}
          onClick={handleContentClick}
          suppressContentEditableWarning
        />
        <div className="flex flex-wrap gap-2">
          {JSON.stringify(parseContent(content))}
        </div>
      </>
    );
  });
  ContentEditableWithPresetChips.displayName = "ContentEditableWithPresetChips";

  export default ContentEditableWithPresetChips;
  