import React from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RenderHTML from "react-native-render-html";
import API, { endpoints } from "../../configs/API";
import MyStyles from "../../styles/MyStyles";
import Styles from "./Styles";
import moment from "moment";

const LessonDetails = ({ route }) => {
    const [lesson, setLesson] = React.useState(null);
    const [comments, setComments] = React.useState(null)
    const {lessonId} = route.params;

    React.useEffect(() => {
        const loadLesson = async () => {
            try {
                let res = await API.get(endpoints['lessonDetails'](lessonId));
                setLesson(res.data)
            } catch (ex) {
                console.error(ex);
            }
        }

        const loadComments = async () => {
            try {
                let res = await API.get(endpoints['comments'](lessonId));
                setComments(res.data);
            } catch (ex) {
                setComments
                console.info(ex);
            }
        }

        loadLesson();
        loadComments();
    }, [lessonId]);

    return (
        <View style={MyStyles.container}>
            
            <Text style={MyStyles.subject}>CHI TIẾT BÀI HỌC</Text>
            {lesson===null?<ActivityIndicator />: <>
                <View style={MyStyles.row}>
                    <Image source={{uri: lesson.image}} style={[MyStyles.thumb, MyStyles.m_10]} />
                    <View>
                        <Text style={[MyStyles.title, MyStyles.m_10]}>{lesson.subject}</Text>   
                        <View style={MyStyles.row}>
                            {lesson.tags.map(t => <Text key={t.id} style={Styles.tag}>{t.name}</Text>)}
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <RenderHTML source={{html: lesson.content}} />
                </ScrollView>
            </>}
            
            {comments===null?<ActivityIndicator />: <>
                
                <ScrollView>
                    {comments.map(c => <>
                        <View key={c.id} style={MyStyles.row}>
                            <Image source={{uri: c.user.image}} style={[Styles.avatar, MyStyles.m_10]} />
                            <View style={MyStyles.m_10}>
                                <Text>{c.content}</Text>
                                <Text>{moment(c.created_date).fromNow()}</Text>
                            </View>
                        </View>
                    </>)}
                    
                </ScrollView>
            </>}
            
        </View>
    );
}

export default LessonDetails;