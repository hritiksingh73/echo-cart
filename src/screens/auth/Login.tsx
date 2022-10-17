import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import AppButton from '@src/components/Button';
import AppTextInput from '@src/components/Input';
import colors from '@src/constants/colors';
import globalStyles from '@src/constants/globalStyles';
import { useAppDispatch } from '@src/redux/store';
import { logInUser } from '@src/redux/thunk/userThunks';
import { AuthStackNavigatorProps } from '@src/types/NavigationTypes';

const Login = () => {
  //Todo:- Writing a better logic for this
  const [showPass, setShowPass] = useState(false);

  const dispatch = useAppDispatch();

  const iconPressHandler = () => {
    setShowPass(!showPass);
  };

  const { handleSubmit, control, setError } = useForm({
    mode: 'onBlur',
  });

  const navigator = useNavigation<AuthStackNavigatorProps>();

  const submitHandler = (data: any) => {
    dispatch(logInUser({ email: data.email, pass: data.pass, setError }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={globalStyles.authHeading}>RN SHOP</Text>
      <AppTextInput
        control={control}
        name="email"
        placeholder="Email"
        keyboardType="email-address"
        rules={{
          required: {
            value: true,
            message: 'This field is required',
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'invalid email address',
          },
        }}
      />
      <AppTextInput
        control={control}
        name="pass"
        placeholder="Password"
        rules={{
          required: {
            value: true,
            message: 'This field is required',
          },
          // pattern: {
          //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
          //   message: 'Please Enter a strong password',
          // },
          minLength: {
            value: 8,
            message: 'Minimum 8 char is required',
          },
        }}
        onIconPress={iconPressHandler}
        showPass={showPass}
        isPass={true}
      />
      <AppButton text="Login" onPress={handleSubmit(submitHandler)} />
      <Text style={styles.orTxt}>OR</Text>
      <AppButton
        customStyle={styles.signUpInbtn}
        text="SignUp"
        onPress={() => navigator.navigate('SignUp')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    marginTop: 150,
  },
  signUpInbtn: {
    backgroundColor: colors.grey,
  },
  orTxt: {
    paddingTop: 15,
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default Login;
