export type Modifiers = 'Diamond Cross' | 'Cuban Chain' | 'Group';

export interface PFPState {
  originalImage: string | null;
  generatedImage: string | null;
  isGenerating: boolean;
  selectedModifiers: Modifiers[];
}
