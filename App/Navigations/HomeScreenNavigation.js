import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/HomeScreen';
import CoursedetailScreen from '../Screen/CoursedetailScreen';
import ChapterContentScreen from '../Screen/ChapterContentScreen';

const Stack = createStackNavigator();

export default function HomeScreenNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='course-detail' component={CoursedetailScreen} />
      <Stack.Screen name='chapter-content' component={ChapterContentScreen} />
    </Stack.Navigator>
  );
}