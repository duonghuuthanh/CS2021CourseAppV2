import { useContext, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native"
import * as ImagePicker from 'expo-image-picker';

import MyStyles from "../../styles/MyStyles"
import Style from "./Style";
import API, { endpoints } from "../../configs/API";


const Register = ({navigation}) => {
    const [user, setUser] = useState({
        "first_name": "",
        "last_name": "",
        "username": "",
        "password": "",
        "avatar": ""
    });
    const register = async () => {
        let form = new FormData();
        for (let key in user) {
            if (key === 'avatar') {
                form.append(key, {
                    uri: user[key].uri,
                    name: user[key].fileName,
                    type: user[key].uri.type
                })
            } else
                form.append(key, user[key])
        }

        try {
            let res = await API.post(endpoints['register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        
            console.info(res.data);

            navigation.navigate("Login");
        } catch (ex) {
            console.error(ex);
        }
    }

    const picker = async () => {
        let {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted')
            alert("Permission denied!")
        else {
            let res = await ImagePicker.launchImageLibraryAsync();
            if (!res.canceled) {
                change('avatar', res.assets[0]);
            }
        }
    }

    const change = (field, value) => {
        setUser(current => {
            return {...current, [field]:value}
        })
    }

    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>ĐĂNG KÝ</Text>

            <TextInput value={user.first_name} onChangeText={t => change("first_name", t)} placeholder="Tên..." style={Style.input} />
            <TextInput value={user.last_name} onChangeText={t => change("last_name", t)} placeholder="Họ và chữ lót..." style={Style.input} />
            <TextInput value={user.username} onChangeText={t => change("username", t)} placeholder="Tên đăng nhập..." style={Style.input} />
            <TextInput value={user.password} onChangeText={t => change("password", t)} secureTextEntry={true} placeholder="Mật khẩu..." style={Style.input} />
            <TextInput secureTextEntry={true} placeholder="xác nhận mật khẩu..." style={Style.input} />
            <TouchableOpacity style={Style.input} onPress={picker}>
                <Text>Chọn ảnh đại diện...</Text>
            </TouchableOpacity>
            {user.avatar?<Image style={Style.img} source={{uri: user.avatar.uri }} />:""}
            <TouchableOpacity onPress={register}>
                <Text style={Style.button}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Register