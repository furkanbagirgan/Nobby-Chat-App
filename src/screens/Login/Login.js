import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {LinearGradient} from 'expo-linear-gradient';

import styles from './Login.style';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {loginWithUser} from '../../utilities/firebaseActions';
import {checkLogin} from '../../utilities/authValidation';
import colors from '../../styles/colors';

const Login = ({navigation}) => {
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
    },
  });
  const dispatch = useDispatch();

  //The entered information is checked and entered into firebase. Then this information is saved to storage and redux.
  const login = async data => {
    setLoading(true);
    const res = checkLogin(data.email, data.password);
    if (res === 1) {
      await loginWithUser(data.email, data.password, 'light', dispatch);
    }
    setLoading(false);
  };

  //Here is the transition to the sign up screen.
  const goToSignup = () => {
    navigation.navigate('Signup');
  };

  //Here, inputs for user data and button are pressed to the screen.
  return (
    <LinearGradient
      colors={colors.primaryGradientColors}
      style={styles[theme].container}>
      <View style={styles[theme].wrapper}>
        <Text style={styles[theme].header}>Log In</Text>
        <View style={styles[theme].formContainer}>
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
        </View>
        <Button
          title="Log In"
          loading={loading}
          onClick={handleSubmit(login)}
          theme="dark"
        />
        <Text style={styles[theme].signupText}>New To Nobby?</Text>
        <Button title="Sign Up" onClick={goToSignup} theme="dark" />
      </View>
    </LinearGradient>
  );
};

export default Login;
