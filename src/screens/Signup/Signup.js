import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {LinearGradient} from 'expo-linear-gradient';
import {useHeaderHeight} from '@react-navigation/elements';

import styles from './Signup.style';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {createUser} from '../../utilities/firebaseActions';
import {checkSignup} from '../../utilities/authValidation';
import colors from '../../styles/colors';

const Signup = () => {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
      displayName: '',
    },
  });
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();

  //The entered information is checked and saved to firebase. Then this information is saved to storage and redux.
  const signup = async data => {
    setLoading(true);
    const res = checkSignup(data.email, data.password, data.repeatPassword);
    if (res === 1) {
      await createUser(data.email, data.password, data.displayName, dispatch);
    }
    setLoading(false);
  };

  //Here, inputs for user data and button are pressed to the screen.
  return (
    <LinearGradient
      colors={colors.primaryGradientColors}
      style={{...styles[theme].container, paddingBottom: headerHeight / 2}}>
      <View style={styles[theme].wrapper}>
        <Text style={styles[theme].header}>Sign Up</Text>
        <View style={styles[theme].formContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                theme={theme}
                placeholder="Name and Surname"
                iconName="person"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="displayName"
          />
          {errors.displayName && (
            <Text style={styles[theme].errorText}>This field is required*</Text>
          )}
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
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={styles[theme].errorText}>This field is required*</Text>
          )}
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
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles[theme].errorText}>This field is required*</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                theme={theme}
                placeholder="Repeat Password"
                iconName="lock-closed"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="repeatPassword"
          />
          {errors.repeatPassword && (
            <Text style={styles[theme].errorText}>This field is required*</Text>
          )}
        </View>
        <Button
          title="Sign Up"
          loading={loading}
          onClick={handleSubmit(signup)}
          theme="dark"
        />
      </View>
    </LinearGradient>
  );
};

export default Signup;
