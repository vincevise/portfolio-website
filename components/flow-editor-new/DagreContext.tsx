import dagre from 'dagre';
import { createContext, useContext } from 'react';

const DagreGraphContext = createContext<dagre.graphlib.Graph | null>(null);

export const useDagreGraph = () => {
  return useContext(DagreGraphContext);
};

export const DagreGraphProvider = DagreGraphContext.Provider;
