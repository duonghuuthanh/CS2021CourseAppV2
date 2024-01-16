import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native"
import API, { authAPI, endpoints } from "../../configs/API";
import MyContext from "../../configs/MyContext";
import MyStyles from "../../styles/MyStyles"
import Style from "./Style";


const Login = ({navigation}) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [user, dispatch] = useContext(MyContext);

    const login = async () => {
        try {
            let res = await API.post(endpoints['login'], {
                'username': username,
                'password': password,
                'client_id': "Vbe8euZZQJoWJ2UzW9wDThg4hJEZHHbhFmnfj7UR",
                'client_secret': "cVm4w4hSdy4MtwbP4KuNgXkGPeQJ9yrQdBvXHGR6b3e97F2bYqQ81XJ49FEufzjcw4SKwpuOZQiCLsNelHY1MkuYTGBRcSqtWmSlebSUk27WfyDskCB2VeCQihnEKdZ2",
                "grant_type": "password"
            });
            console.info(res.data)

            await AsyncStorage.setItem('access-token', res.data.access_token)

            let user = await authAPI(res.data.access_token).get(endpoints['current-user']);
            dispatch({
                "type": "login",
                "payload": user.data
            });
            navigation.navigate("Home");
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>ĐĂNG NHẬP</Text>

            <TextInput value={username} onChangeText={t => setUsername(t)} placeholder="Tên đăng nhập..." style={Style.input} />
            <TextInput value={password} onChangeText={t => setPassword(t)} secureTextEntry={true} placeholder="Mật khẩu..." style={Style.input} />
            <TouchableOpacity onPress={login}>
                <Text style={Style.button}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login