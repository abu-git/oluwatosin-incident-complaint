import { z } from 'zod'


export const complaintSchema = z.object({
    name: z.string().min(3).max(20),
    employerId: z.string().min(3).max(20),
    department: z.string().min(3).max(20),
    incident: z.enum(["Application software crashes", "Unable to connect to server", "Desktop application issue", "Active directory issue", "Rejoin domain/workgroup", "Unable to print", "Paper jam", "Out of toner", "Windows operating system requires reinstall", "Operating system crashes"]),
    classification: z.enum(["Software application", "Networking", "Domain Issues"]),
    priority: z.enum(["Low", "Medium", "High"]),
    assignedTeam: z.enum(["Software Team", "Network Team", "Domain Team", "Support Team"]),
    diagnosisAction: z.string().min(7).max(100),
    resolutionStatus: z.enum(["Resolved", "Escalate"]),
    escalationLevel: z.enum(["Second Level Escalation", "Third Level Escalation"]),
    escalationStatus: z.enum(["In Progress", "Waiting Approval", "Order System", "Order Software"]),
    resolvedBy: z.enum(["resolved@amouser", "resolved@dcdatauser", "resolved@i.techsolutionuser"]),
})
