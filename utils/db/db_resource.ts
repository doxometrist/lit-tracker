

export interface Resource {
  name: string;
  contents: any;
  type: 'pdf' | 'recording' | 'image';
}