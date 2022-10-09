import { request } from 'http'
import  { NextApiRequest, NextApiResponse } from 'next'

export default (request: NextApiRequest, response: NextApiResponse) =>{
    const users =[
        {
            id: 1, name: 'robson'
        },
        {
            id: 2, name: 'Daiane'
        },
        {
            id: 3, name: 'Enzo'
        }
    ]

    return response.json(users)
}