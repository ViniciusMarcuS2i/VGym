import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  Input,
  useToast,
} from "native-base";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import useAuth from "@hooks/useAuth";
import { Controller, set, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppError } from "@utils/AppError";
import { useState } from "react";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const signInSchema = yup.object({
    email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
    password: yup.string().required("Informe a senha"),
  });
  type FormData = yup.InferType<typeof signInSchema>;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
  });

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handelSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await signIn(email, password);
      console.log({ email, password });
      console.log(user);
    } catch (error) {
      const isAppError = error instanceof AppError;
      console.log(error);

      const title = isAppError ? error.message : "Não foi possível entrar.";
      setIsLoading(false);

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="gray.700" px={10}>
        <Image
          defaultSource={BackgroundImg}
          source={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>
        <VStack>
          <Heading
            color="gray.100"
            alignSelf="center"
            fontSize="xl"
            mb={6}
            fontFamily="heading"
          >
            Acesse sua conta
          </Heading>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.700"
                h={14}
                px={4}
                borderWidth={`${errors.email ? 1 : 0}`}
                borderColor={`${errors.email && "red.500"}`}
                fontSize="md"
                color="white"
                fontFamily="body"
                placeholderTextColor="gray.300"
                _focus={{
                  bg: "gray.700",
                  borderWidth: 1,
                  borderColor: "green.500",
                }}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.email && (
            <Text color="red.500" textAlign="left" fontSize="sm">
              {errors.email.message}
            </Text>
          )}
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                mt={14}
                bg="gray.700"
                borderWidth={`${errors.password ? 1 : 0}`}
                borderColor={`${errors.password && "red.500"}`}
                h={14}
                px={4}
                fontSize="md"
                color="white"
                fontFamily="body"
                placeholderTextColor="gray.300"
                _focus={{
                  bg: "gray.700",
                  borderWidth: 1,
                  borderColor: "green.500",
                }}
                placeholder="Insira sua senha"
                keyboardType="email-address"
                autoCapitalize="none"
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.password && (
            <Text color="red.500" fontSize="sm">
              {errors.password.message}
            </Text>
          )}

          <Button
            isLoading={isLoading}
            mt={18}
            title="Acessar"
            onPress={handleSubmit(handelSignIn)}
          />
        </VStack>
        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
        </Center>

        <Button
          onPress={handleNewAccount}
          variant="outline"
          title="Criar conta"
        />
      </VStack>
    </ScrollView>
  );
}
