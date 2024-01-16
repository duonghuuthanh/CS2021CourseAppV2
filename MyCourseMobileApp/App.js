import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native"
import Home from "./components/Home/Home";
import Login from "./components/User/Login";
import API, { endpoints } from "./configs/API";
import React, { useReducer } from "react";
import Lesson from "./components/Lessons/Lesson";
import LessonDetails from "./components/Lessons/LessonDetails";
import MyContext from "./configs/MyContext";
import MyUserReducer from "./reducers/MyUserReducer";
import Logout from "./components/User/Logout";
import Register from "./components/User/Register";

const Drawer = createDrawerNavigator();

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);

  return (
    <MyContext.Provider value={[user, dispatch]}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={MyDrawerItem} screenOptions={{headerRight: Logout}}>
          <Drawer.Screen name="Home" component={Home} options={{title: 'Khóa học'}} />

          
          {user===null?<>
            <Drawer.Screen name="Login" component={Login} options={{title: 'Đăng nhập'}} />
          <Drawer.Screen name="Register" component={Register} options={{title: 'Đăng ký'}} />
          </>:<>
          <Drawer.Screen name={user?.username} component={Home} /></>}
          
          
          

          <Drawer.Screen name="Lesson" component={Lesson} options={{title:"Bài học", drawerItemStyle: {display: "none"}}} />
          <Drawer.Screen name="LessonDetails" component={LessonDetails} options={{ title: "Chi tiết bài học", drawerItemStyle: {display: "none"}}} />
        </Drawer.Navigator>
      </NavigationContainer>
    </MyContext.Provider>
  )
}

const MyDrawerItem = (props) => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const loadCates = async () => {
      let res = await API.get(endpoints['categories'])
      setCategories(res.data);
    }

    loadCates();
  }, [])

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {categories.map(c => <DrawerItem label={c.name} key={c.id} 
                                       onPress={() => props.navigation.navigate('Home', {cateId: c.id})} />)}
    </DrawerContentScrollView>
  );
}

export default App;