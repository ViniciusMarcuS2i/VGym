import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { VStack, FlatList, HStack, Heading, Text } from "native-base";
import { useState } from "react";

export function Home(){
    const [groups, setGroups] = useState(['Costas', 'Biceps', 'Triceps', 'ombro' ]);
    const [exercises, setExercises] = useState(['Puxada Frontal', 'Remada Curvada', 'Remada Unilateral', 'Puxada Livre' ]);
    const [groupSelected, setGroupSelected] = useState('Costas');

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleOpenExerciseDetails(){
        navigation.navigate('exercise');
    }

    return(

        <VStack flex={1}>
            <HomeHeader />
            <FlatList 
            data={groups}
            keyExtractor={item => item}
            renderItem={({item }) => (
                <Group 
                isActive={groupSelected === item} 
                name={item}
                onPress={() => setGroupSelected(item)}
                />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            _contentContainerStyle={{px: 8}}
            my={10}
            maxHeight={10}
            />
            <VStack flex={1} px={8}>
                <HStack justifyContent="space-between" mb={5}>
                    <Heading fontFamily="heading" color="gray.200" fontSize="md">
                        Exercícios
                    </Heading>

                    <Text color="gray.200" fontSize="sm">
                        {exercises.length}
                    </Text>
                </HStack>
                <FlatList 
                    data={exercises}
                    keyExtractor={item => item}
                    renderItem={({item }) =>(
                        <ExerciseCard 
                            onPress={handleOpenExerciseDetails}
                        />
                    ) 
                }
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{paddingBottom: 20}}
                />
                
                
            </VStack>
           
            
        </VStack>

    );
}