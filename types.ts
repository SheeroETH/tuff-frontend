export type Modifiers = 'Cuban Chain' | 'Cuban Chain + Diamond Cross' | 'Teeth & Eyes' | 'Group';

export interface PFPState {
  originalImage: string | null;
  generatedImage: string | null;
  isGenerating: boolean;
  selectedModifiers: Modifiers[];
}
