import { StatusBar } from "expo-status-bar";
import { ThemedView } from "./ThemedView"
import { 
  StyleSheet,
  TouchableOpacity, 
  View, 
  ScrollView, 
  TextInput,
  Text
 } from "react-native";
import { ThemedText } from "./ThemedText";
import {useColorScheme} from '@/hooks/useColorScheme';
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StudyTopicRandomizer = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const [activeTab, setActiveTab] = useState('system-design');
  const [systemDesignTopics, setSystemDesignTopics] = useState<string[]>([]);

  // load data from AsyncStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      try{
        const storedSystemDesignTopics = await AsyncStorage.getItem('systemDesignTopics');
  
        // set default topics if none are selected
        if (storedSystemDesignTopics) {
          setSystemDesignTopics(JSON.parse(storedSystemDesignTopics));
        } else {
          setSystemDesignTopics([
            'Distributed Systems', 'Load Balancing', 'Caching', 'Database Sharding',
            'Message Queue', 'Microservices Architecture', 'API Design', 'Rate Limiting',
            'Data Partitioning', 'CAP Theorem', 'Consistent Hashing'
          ]);
        }
      } catch (error) {
        console.error('Error loading data from AyncStorage: ', error);
      } 
    }

    loadData();
  }, [])

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'}/>
      <ThemedView style={styles.card}>
        <View style={styles.cardHeader}>
          <ThemedText type="title">Study Topic Randomizer</ThemedText>
          <ThemedText>Randomly select topics to study each day</ThemedText>
        </View>
        <ThemedView style={styles.cardContent}>
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'system-design' && [styles.activeTab, {borderBottomColor: themeColors.tint}]
              ]}
              onPress={() => setActiveTab('system-design')}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === 'system-design' && {color: themeColors.tint}
                ]}
              >
                System Design
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'interview-topics' && [styles.activeTab, {borderBottomColor: themeColors.tint}]
              ]}
              onPress={() => setActiveTab('interview-topics')}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === 'interview-topics' && {color: themeColors.tint}
                ]}
              >
                Interview Topics
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          <ScrollView style={styles.tabContent}>
            {activeTab === 'system-design' ? (
              <>
                <View style={styles.topicSection}>
                  <ThemedText style={styles.sectionTitle}>Today's System Design Topic:</ThemedText>
                  <ThemedView style={styles.emptyTopic}>
                    <ThemedText style={styles.emptyTopicText}>
                      Click "Select Random Topic" to get today's focus
                    </ThemedText>
                  </ThemedView>
                </View>

                <View style={styles.addTopicSection}>
                  <TextInput 
                    style={[
                      styles.input,
                      {
                        borderColor: colorScheme === 'dark' ? '#444' : '#ddd',
                        color: colorScheme === 'dark' ? '#fff' : '#000',
                        backgroundColor: colorScheme === 'dark' ? '#222' : '#fff'
                      }
                    ]}
                    placeholderTextColor={colorScheme === 'dark' ? '#888' : '#999'}
                    placeholder="Add new system design topic"
                  />
                  <TouchableOpacity
                    style={[styles.addButton,
                      {
                        backgroundColor: themeColors.tint
                      }]
                    }
                  >
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.tagContainer}>
                  <View style={styles.tagWrapper}>
                    {systemDesignTopics.map((topic, index) => (
                      <ThemedView
                        key={index}
                        style={styles.tag}
                        lightColor="#f5f5f5"
                        darkColor="#333"
                      >
                        <ThemedText style={styles.tagText}>{topic}</ThemedText>
                        <TouchableOpacity
                          style={styles.removeButton}
                        >
                          <ThemedText style={[styles.removeButtonText, {color: colorScheme === 'dark' ? '#aaa' : '#999'}]}>x</ThemedText>
                        </TouchableOpacity>
                      </ThemedView>
                    ))}
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={styles.topicSection}>
                  <ThemedText>Today's Interview Topic:</ThemedText>
                  <ThemedView style={styles.emptyTopic}>
                    <ThemedText style={styles.emptyTopicText}>
                      Click "Select Random Topic" to get today's focus
                    </ThemedText>
                  </ThemedView>
                </View>
                <View style={styles.addTopicSection}>
                  <TextInput 
                      style={[
                        styles.input,
                        {
                          borderColor: colorScheme === 'dark' ? '#444' : '#ddd',
                          color: colorScheme === 'dark' ? '#fff' : '#000',
                          backgroundColor: colorScheme === 'dark' ? '#222' : '#fff'
                        }
                      ]}
                      placeholderTextColor={colorScheme === 'dark' ? '#888' : '#999'}
                      placeholder="Add new system design topic"
                    />
                    <TouchableOpacity
                      style={[styles.addButton,
                        {
                          backgroundColor: themeColors.tint
                        }]
                      }
                    >
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
                
              </>
            )}
          </ScrollView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  card: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 16,
    gap: 4
  },
  cardContent: {
    flex: 1,
    padding: 16
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabContent: {
    flex: 1
  },
  topicSection: {
    marginBottom: 16,
  },
  emptyTopic: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    opacity: 0.6,
  },
  emptyTopicText: {
    opacity: 0.7,
  },
  sectionTitle: {
    marginBottom: 0,
  },
  addTopicSection: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  addButton: {
    paddingHorizontal: 15,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '500' 
  },
  tagContainer: {
    marginBottom: 16,
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
    margin: 4,
  },
  tagText: {
    fontSize: 12,
  },
  removeButton: {
    marginLeft: 6,
    padding: 2,
  },
  removeButtonText: {
    fontSize: 16,
  }
})

export default StudyTopicRandomizer;