import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const endpoints = {
    'categories': '/categories/',
    'courses': '/courses/',
    'lessons': (courseId) => `/courses/${courseId}/lessons/`,
    'lessonDetails': (lessonId) => `/lessons/${lessonId}/`,
    'comments': (lessonId) => `/lessons/${lessonId}/comments/`,
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',
    'add-comment': (lessonId) => `/lessons/${lessonId}/comments/`
}

export const authAPI = (accessToken) => axios.create({
    baseURL: "https://thanhduong.pythonanywhere.com",
    headers: {
        Authorization: `bearer ${accessToken?accessToken:AsyncStorage.getItem("acess-token")}`
    }
})

export default axios.create({
    baseURL: "https://thanhduong.pythonanywhere.com"
})