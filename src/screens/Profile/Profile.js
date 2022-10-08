import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import Icon from '@expo/vector-icons/Ionicons';
import IconF from '@expo/vector-icons/Foundation';
import * as ImagePicker from 'expo-image-picker';

import styles from './Profile.style';
import colors from '../../styles/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {editProfile, logOut} from '../../utilities/firebaseActions';
import {checkSignup} from '../../utilities/authValidation';
import {removeItem, setItem} from '../../utilities/asyncStorage';
import {setTheme} from '../../redux/themeSlice';

const Profile = () => {
  //Necessary states are created.
  const currentUser = useSelector(state => state.auth.currentUser);
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
  const [editInput, setEditInput] = useState({
    displayName: {status: false, icon: 'pencil'},
    email: {status: false, icon: 'pencil'},
    password: {status: false, icon: 'pencil'},
  });
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(currentUser.photoURL);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: currentUser.email,
      password: currentUser.password,
      displayName: currentUser.displayName,
    },
  });

  //Change input editable with icon
  const editValue = inputName => {
    let iconName = '';
    if (editInput[inputName].icon === 'pencil') {
      iconName = 'x';
    } else {
      iconName = 'pencil';
    }
    setEditInput({
      ...editInput,
      [inputName]: {status: !editInput[inputName].status, icon: iconName},
    });
  };

  //Changed user data here is updated via context, storage and firebase.
  const save = async data => {
    setLoading(true);
    const res = checkSignup(data.email, data.password, data.password);
    if (res !== 0) {
      const userData = {
        email: currentUser.email,
        password: currentUser.password,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      };
      await editProfile(data, userData, profileImage, dispatch);
    }
    setLoading(false);
  };

  //This function allows the user to select pictures by camera or gallery.
  const editPhoto = async () => {
    Alert.alert('Edit Photo', 'Please select the photo option', [
      {
        text: 'Camera',
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
          });
          if (!result.cancelled) {
            setProfileImage(result.uri);
          }
        },
      },
      {
        text: 'Gallery',
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
          });
          if (!result.cancelled) {
            setProfileImage(result.uri);
          }
        },
      },
    ]);
  };

  //Changing profileImage state to null.
  const removePhoto = () => {
    setProfileImage(null);
  };

  //Sign out of firebase
  const signOut = async () => {
    await logOut(dispatch);
  };

  //Here, the existing theme is changed according to the clicked theme.
  const changeTheme = async themeName => {
    await removeItem('@themeData');
    await setItem('@themeData', themeName);
    dispatch(setTheme(themeName));
  };

  //Elements that will appear on the screen are defined here
  return (
    <ScrollView
      style={styles[theme].container}
      contentContainerStyle={styles[theme].contentContainer}
      overScrollMode="never"
      bounces={false}>
      <View style={styles[theme].themeContainer}>
        <TouchableWithoutFeedback onPress={() => changeTheme('light')}>
          <View style={styles[theme].lightTheme}>
            <Icon name="sunny-outline" size={25} color="#A9A9A9" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => changeTheme('dark')}>
          <View style={styles[theme].darkTheme}>
            <Icon name="moon-outline" size={25} color="#A9A9A9" />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles[theme].imageWrapper}>
        {profileImage !== null ? (
          <Image source={{uri: profileImage}} style={styles[theme].image} />
        ) : (
          <Icon
            name="person"
            color={
              theme === 'light'
                ? colors.primaryBackground
                : colors.secondaryBackground
            }
            size={70}
          />
        )}
        <View style={styles[theme].iconsContainer}>
          <View style={styles[theme].photoIconWrapper}>
            <IconF
              name="pencil"
              color={colors.primaryBackground}
              size={16}
              onPress={editPhoto}
            />
          </View>
          <View style={styles[theme].photoIconWrapper}>
            <Icon
              name="trash"
              color={colors.primaryBackground}
              size={16}
              onPress={removePhoto}
            />
          </View>
        </View>
      </View>
      <View style={styles[theme].inputContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              theme={theme}
              placeholder="Name Surname"
              iconName="person"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              enable={editInput.displayName.status}
            />
          )}
          name="displayName"
        />
        <IconF
          name={editInput.displayName.icon}
          color={colors.primaryBlue}
          size={20}
          style={styles[theme].editIcon}
          onPress={() => editValue('displayName')}
        />
      </View>
      {errors.displayName && (
        <Text style={styles[theme].errorText}>This field is required*</Text>
      )}
      <View style={styles[theme].inputContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              theme={theme}
              placeholder="Email"
              iconName="mail"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              enable={editInput.email.status}
            />
          )}
          name="email"
        />
        <IconF
          name={editInput.email.icon}
          color={colors.primaryBlue}
          size={20}
          style={styles[theme].editIcon}
          onPress={() => editValue('email')}
        />
      </View>
      {errors.email && (
        <Text style={styles[theme].errorText}>This field is required*</Text>
      )}
      <View style={styles[theme].inputContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              theme={theme}
              placeholder="Password"
              iconName="lock-closed"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              enable={editInput.password.status}
            />
          )}
          name="password"
        />
        <IconF
          name={editInput.password.icon}
          color={colors.primaryBlue}
          size={20}
          style={styles[theme].editIcon}
          onPress={() => editValue('password')}
        />
      </View>
      {errors.password && (
        <Text style={styles[theme].errorText}>This field is required*</Text>
      )}
      <View style={styles[theme].buttonWrapper}>
        <Button
          title="Save"
          loading={loading}
          onClick={handleSubmit(save)}
          theme="dark"
        />
        <Button title="Sign out" onClick={signOut} theme="dark" />
      </View>
    </ScrollView>
  );
};

export default Profile;
