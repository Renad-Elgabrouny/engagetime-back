import { Session } from "../models/Session.js"

const getAllSessions = async (userId) => {
    let sessions = await Session.find({userId})    
    return sessions;
}

const createSession = async ({title, accessType, state, userId}) => {
    // TODO: craete better slugs other than UUID
    const slug = crypto.randomUUID(); 
    const session = Session.create({title, slug, accessType, state, userId})
    return session;
}

const getSession = async (id, userId) => {
    const session = await Session.findOne({_id:id, userId});
    console.log(session);
    return session;
}

const updateSession = async (id, { title, accessType, state }, userId) => {
    let updatedData = {};
    if(title) updatedData.title = title;
    if(accessType) updatedData.accessType = accessType;
    if(state) updatedData.state = state; 
    const session = await Session.findOneAndUpdate({_id:id, userId}, updatedData, {new: true});
    return session;
}

const deleteSession = async (id,  userId) => {
    const session = await Session.findOneAndDelete({_id:id, userId});
    return session;
}


export {
    getAllSessions,
    createSession,
    getSession,
    updateSession,
    deleteSession
}