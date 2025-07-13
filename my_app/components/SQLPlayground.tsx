'use client'

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
//import { atomDark } from 'react-syntax-highlighter/dist/styles/prism'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { SQL_SCHEMA } from '@/lib/sqlSchema'

export default function SQLPlayground() {
    const [query, setQuery] = useState('')
    const [result, setResult] = useState('')
    const [output, setOutput] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    
    try {
        const response = await fetch('http://localhost:11434/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "llama3.2:3b",
                messages: [{
                    role: "system",
                    //content: `As a professional SQL Developer, only SQL queries should be in response without extra things or descriptions because this will be input for SQL playground. Assume I have a DB with this structure:\n\n${SQL_SCHEMA}`
                    // content: `As a professional SQL Developer, only SQL queries should be in response and one and only one query without extra things or descriptions like notes or suggestestions because this will be input for SQL playground. Assume I have a DB with this structure:\n\n${SQL_SCHEMA}`
                    content: `You are a professional SQL developer working inside a secure SQL playground environment. Your job is to ONLY return one single, valid SELECT SQL query as a response, with no comments, notes, explanations, or formatting (e.g., no code blocks or markdown).                    ❗ You are strictly forbidden from generating any SQL query that contains INSERT, UPDATE, DELETE, DROP, ALTER, TRUNCATE, or any other data-manipulating or schema-changing operations.The query will be executed directly against a live database for visualization only.If the user asks for any non-SELECT action, you must refuse and respond with: -- Operation not allowed. Only SELECT queries are permitted., Assume I have a DB with this structure:\n\n${SQL_SCHEMA}`
                },
                {
                    role: "user",
                    content: query
                }
                ],
                stream: false
            }),
        })
        const data = await response.json()
        console.log('LLM raw response:', data)
        const generatedQuery = data.message.content.replace(/```sql|```/g, '').trim()
        console.log(generatedQuery)
        setResult(generatedQuery)

        // call the new SQL execution api
        const sqlResponse = await fetch('/api/sql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: generatedQuery}),
        })

        const sqlData = await sqlResponse.json()
        setOutput(JSON.stringify(sqlData.results, null, 2))

    } catch (error) {
        console.error('Error', error)
        setResult('Error executing query')
        
    }
}

    return (
        <div className="container mx-auto p-4">
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>SQL Playground</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y4">
                        <Input
                            placeholder="Enter your SQL query here"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full"
                        />
                        <Button type="submit">Generate SQL Query</Button>                        
                    </form>
                </CardContent>
            </Card>
            {result && (
                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>Generated Sql Query</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SyntaxHighlighter language="sql" style={atomDark}>
                            {result}
                        </SyntaxHighlighter>
                    </CardContent>
                </Card>
            )}

            {output  &&(
                <Card>
                    <CardHeader>
                        <CardTitle>Query Output</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SyntaxHighlighter language="json" style="atomDark">
                            {output}
                        </SyntaxHighlighter>
                    </CardContent>
                </Card>
            )}
        </div>

    )

}