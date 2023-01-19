const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client')
const { text } = require('express')

const notion = new Client({
    auth: process.env.NOTION_TOKEN
})
const databaseId = process.env.NOTION_DATABASE_ID

module.exports.getData = async function getData() {
    const {results} = await notion.databases.query({
        database_id: databaseId
    })
    return results
}

module.exports.addItem = async function addItem(name, pw) {
    const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
            "이름": {
                title:[
                    {
                        "text": {
                            "content": name,
                        }
                    }
                ]
            },
            "텍스트": {
                rich_text:[
                    {
                        "text":{
                            "content": pw,
                        }
                    }
                ]
            }
        }
    })
    return response
} //데이터 추가

module.exports.findOne = async function findOne(name) {
    const response = await notion.databases.query({
        database_id: databaseId,
        filter:{
            property: "이름",
            title:{
                contains: name
            }
        }
    })
    return response
} // 계정 있는지 찾기