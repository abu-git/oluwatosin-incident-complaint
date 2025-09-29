import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const resolvedIncidentType = defineType({
    name: 'resolved',
    title: 'Resolved Incidents',
    type: 'document',
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Name'
        }),
        defineField({
            name: 'employerId',
            type: 'string',
            title: 'Employer ID'
        }),
        defineField({
            name: 'department',
            type: 'string',
            title: 'Department'
        }),
        defineField({
            name: 'incident',
            type: 'string',
            title: 'Incident'
        }),
        defineField({
            name: 'classification',
            type: 'string',
            title: 'Classification'
        }),
        defineField({
            name: 'priority',
            type: 'string',
            title: 'Priority'
        }),
        defineField({
            name: 'assignedTeam',
            type: 'string',
            title: 'Assigned Team'
        }),
        defineField({
            name: 'diagnosisAction',
            type: 'string',
            title: 'Diagnosis Action'
        }),
        defineField({
            name: 'resolutionStatus',
            type: 'string',
            title: 'Resolution Status'
        }),
    ]
})