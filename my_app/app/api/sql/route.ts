import { NextRequest, NextResponse } from '@/node_modules/next/server'

export async function POST(req: NextRequest) {
    const { Sequelize } = await import('sequelize')
    const pg = await import('pg')

    const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
        host: 'localhost',
        port: 5431,
        dialect: 'postgres',
        dialectModule: pg,
    })

    const { query } = await req.json()

    try {
        const [results] = await sequelize.query(query)
        return NextResponse.json( { results })
    } catch (error) {
        console.error('Error executing query:', error)
        return NextResponse.json({ error: 'Error executing query'}, { status: 500 })
    }
}