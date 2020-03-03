/*
*
* Assignment 3
* Starter Files
*
* COEN 4440
* Spring, 2020
*/

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Images, Colors } from './App/Themes'
import APIRequest from './App/Config/APIRequest'

import News from './App/Components/News'
import Search from './App/Components/Search'

const { width, height } = Dimensions.get('window');

export default class App extends React.Component {

  state = {
    loading: true,
    articles: [],
    searchText: '',
    category: ''
  }

  componentDidMount() {

    //uncomment this to run an API query!
    //this.loadArticles();
  }

  async loadArticles(searchTerm = '', category = '') {
    this.setState({ articles: [], loading: true });
    var resultArticles = [];
    if (category === '') {
      resultArticles = await APIRequest.requestSearchPosts(searchTerm);
    } else {
      resultArticles = await APIRequest.requestCategoryPosts(category);
    }
    console.log(resultArticles);
    this.setState({ loading: false, articles: resultArticles })
  }



  render() {
    const { articles, loading } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container}>

          <View style={styles.header}>

            <Image source={Images.logo} style={styles.logoImage} />

          </View>

          <View style={styles.search}>
            <TextInput
              placeholder='Search'


            />

          </View>

          <View style={styles.news}>
            <Text>
              waewfaw
          </Text>
          </View>

        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
  },
  logoImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'contain',
  },
  search: {

    flex: 1,

  },
  news: {
    flex: 5,
  }
});
