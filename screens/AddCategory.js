import React from 'react';
import {Button,Input} from "react-native-elements"
import {db,storage} from "../firebase"
import {useCollection} from "react-firebase-hooks/firestore"
import * as FileSystem from "expo-file-system"
import useImage from 'use-image';
import { 
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import images from '../constants/images';

const AddCategory = () => {
    const [category,setCategory]=React.useState("");
    const [icon,setIcon]=React.useState("");
    const [id,setCount]=React.useState(0);
    const [image,setImage]=React.useState("");
    const [categoryData] = useCollection(db.collection('Category'));
    const filepickerRefComment=React.useRef(null);
    React.useEffect(() => {
        db.collection('Category')?.get().then(snap=>setCount(snap.size));
    }, [categoryData])
    
    async function uploadImageAsync(uri) {
        console.log(uri);
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
      
        const ref = storage.ref().child(uuid.v4());
        const snapshot = await ref.put(blob);
      
        // We're done with the blob, close and release it
        blob.close();
      
        return await snapshot.ref.getDownloadURL();
      }

    let openImagePickerAsync = async () => {
        if(!image){
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        setImage(pickerResult.uri)
        }
        else{
            setImage("");
        }
      }
    
    const handleSubmit = () => {
        (category && image )?db.collection('Category').add({
            id: parseInt(id)+1,
            name: category,
        }).then(doc=>{
            const uploadTask = storage
                .ref(`category/${doc.id}`)
                .putString(image,'data_url');
                uploadTask.on(
                    'state_change',
                    null,
                    (error) => console.error(error),
                    () => {
                        storage.ref('category').child(`${doc.id}`).getDownloadURL().then(url=>{
                            db.collection('Category').doc(doc.id).set({
                                icon: url
                            },{merge: true});
                        });
                    })
        }
        )
        :<></>;

        setCategory("");
        setImage("")
    }
   
    return (
        <KeyboardAvoidingView behavior="padding" style={{}}>
            <View style={{marginLeft:10,marginRight:10,marginTop:20}}>
                <Input 
                    type="text"
                    autofocus
                    placeholder={"Category Name"}
                    value={category}
                    onChangeText={(text)=>setCategory(text)}
                    style={{
                        padding:10
                    }}
                />
                
                <TouchableOpacity style={{alignItems:'center'}} onClick={() => filepickerRefComment.current.click()}>
                <View style={{flexDirection: 'row',width:100,align:'center',marginBottom:10}}>
                {image?<Text style={{align: "center", marginRight: 10}}>Icon selected</Text>
                // <Image source={image} resizeMode="contain"
                //     style={{
                //         width:30,
                //         height: 30,
                //         marginRight:10
                //     }}/>
                    :<Text style={{align: "center", marginRight: 10}}>No icon selected</Text>}
                {/* {image?<Image source={image} resizeMode="contain"
                    style={{
                        width:30,
                        height: 30,
                        flex:0.25
                    }}/>:<></>} */}
                <Button 
                    title={image?"Remove":"Select"}
                    onPress={openImagePickerAsync}
                    
                />
                </View>
                </TouchableOpacity >
                
                <Button 
                    title="Submit"
                    onPress={handleSubmit}
                    // style={{width:50}}
                />
            </View>
        </KeyboardAvoidingView>
    )
}
export default AddCategory
