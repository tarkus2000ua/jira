import { Issue } from "./issue.model";

export interface Column {
    name: string, 
    id: string, 
    issues: Issue[]
  }