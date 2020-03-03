/*
*
* Assignment 3
* Starter Files
*
* COEN 4440
* Spring, 2020
*/

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TextInput, Keyboard, TouchableWithoutFeedback, SectionList } from 'react-native';
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
            <TextInput style={styles.textField} 
              placeholder='Search for News'
              

            />
            <Image source={Images.lupa} style={styles.lupa}/> 
            
          </View>

          <View style={styles.news}>
            <SectionList
              sections={[
                { title: 'News Article One', data: [{ name: 'This is a fake news article. It is very pointless so ignore it. Kanye kinda lit by the way.' }] },
                { title: 'News Article Two', data: [{ name: 'This is another fake ass news article. But, it is actually important, hence you should read it till the end.' }] },
              ]}
              renderItem={({ item }) => (
                <View>
                  <Text style={styles.itemText}>
                    {item.name}
                  </Text>
                </View>
              )}
              renderSectionHeader={({ section }) => (
                <View>
                  <Text style={styles.itemTitle}>{section.title}</Text>
                </View>
              )}
              
            />
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
  itemText:{
    paddingBottom:20,
  },
  itemTitle:{
    fontSize:20,
    fontWeight:'bold',
  },
  textField:{
    
    flex:1,
    paddingTop:0,
    paddingLeft:25,
  },
  lupa:{
    flex:  0.2,
    aspectRatio:3,
    resizeMode: 'contain',
    alignSelf:'center',
    
  },
  header: {
    flex: 0.8,
    flexDirection: 'row',
    paddingTop: 20,
  },
  logoImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'contain',
  },
  search: {
    width:width-30,
    flex: 0.4,
    backgroundColor: "#f4f4f4",
    borderColor: "#3D3C3A",
    borderRadius:15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  news: {
    paddingTop:20,
    flex: 5,
    justifyContent:'flex-start',
    alignItems:'flex-start',
    paddingHorizontal:20,
  }
});
