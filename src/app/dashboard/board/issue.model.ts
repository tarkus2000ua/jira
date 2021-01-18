export interface Issue {
    id?: string,
    name: string,
    type: 'Epic' | 'User story' | 'Task' | 'New feature' | 'Bug' | 'Issue', 
    priority: 'Major' | 'Critical' | 'Blocker' | 'Minor' | 'Trivial',
    assignee: string,
    reporter: string,
    dueDate: Date,
    createdAt: Date,
    updatedAt: Date,
    summary: string,
    description: string,
    labels: string[],
    status: 'To Do' | 'In Progress' | 'Done' 
}