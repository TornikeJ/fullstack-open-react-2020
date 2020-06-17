// import blogService from '../services/blogs'

export const initBlogs = (blogs) =>{
    return {
        type: 'INIT',
        data: blogs
    }
}

export const addBlogAction = (blog) =>{
    return {
        type: 'ADD_BLOG',
        data: blog
    }
}

export const updateBlogAction = (blog) =>{
    return {
        type: 'UPDATE_BLOG',
        data: blog
    }
}

export const removeBlogAction = (blog) =>{
    return {
        type: 'REMOVE_BLOG',
        data: blog
    }
}

const reducer = (state = [],action) => {
    console.log("state now: ", state);
    console.log("action", action);

    switch(action.type){
        case 'INIT':
            return action.data
        case 'ADD_BLOG':
            return [...state, action.data]
        case 'UPDATE_BLOG':
            const blog={...action.data}
            return state.map(blogDb => blogDb.id === blog.id? blog : blogDb)
        case 'REMOVE_BLOG':
            const blogId=action.data.id
            return state.filter(blog => blog.id !== blogId)
        default:
            return state
    }
}

export default reducer