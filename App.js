/*
*
* Assignment 3
* Starter Files
*
* COEN 4440
* Spring, 2020
*/

import React from 'react';
import { StyleSheet, Picker, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity, TextInput, Keyboard, ActivityIndicator, TouchableWithoutFeedback, SectionList, Linking, Button } from 'react-native';
import { Images, Colors } from './App/Themes'
import APIRequest from './App/Config/APIRequest'

import News from './App/Components/News'
import Search from './App/Components/Search'

const { width, height } = Dimensions.get('window');

const categoriesArt = ['World', 'Politics', 'Business', 'Opinion', 'Technology', 'Science',
  'Health', 'Sports', 'Arts', 'Books', 'Style', 'Food', 'Travel', 'Obituaries']


export default class App extends React.Component {

  state = {
    loading: true,
    articles: [],
    searchText: '',
    category: '',
    picker: false,//flag for the categories
  }

  componentDidMount() {
    this.loadArticles();
  }

  loadingIndicator() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 50 }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )
    }
    else {
      return (null)
    }
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

  articleRenderer(item, index) { // renders the article item  and sends the method openURL 
    //index as a pararameter 
    return (
      <News item={item} method={() => { this.openURL(index) }} />
    )
  }
  openURL = index => { // opens the url of the index in the list
    let allArticles = JSON.parse(JSON.stringify(this.state.articles));
    let URL = allArticles[index].url // saves the url of the article at the index 
    Linking.canOpenURL(URL).then(supported => {
      if (!supported) { // if the url doesnt work prints the following 
        console.log("Can't handle url: " + URL)
      } else { // if the url works the app sends you to the url 
        return Linking.openURL(URL)
      }
    })
    console.log("this is happening")
  }

  onChangeText = searchText => {
    this.setState({ searchText }) // changes the state of searchText 
  }

  searchLoad = searchText => {
    this.loadArticles(searchText, "") // loads articles with the searchText in them

  }
  searchCategory = category => { //loads articles with the selected category
    this.loadArticles('', category)
  }

  _keyExtractor = (item, index) => index;

  loadPickerItems() {
    return (
      categoriesArt.map((x, i) => {
        return (<Picker.Item label={x} key={i} value={x} />)
      })
    )
  }

  showPicker() {
    if (this.state.picker) {
      return (
        <View style={{ flex: 1, paddingHorizontal: 17, alignItems: 'center', justifyContent: 'center' }}>
          <Picker style={{ flex: 1, position: "absolute", width: '100%' }}
            selectedValue={this.state.category}
            onValueChange={(itemValue, itemIndex) => { this.setState({ category: itemValue }), this.searchCategory(itemValue) }}
            itemStyle={{ flex: 1 }}
            mode='dropdown'>
            <Picker.Item label='Default' value='' />
            {
              this.loadPickerItems() //loads the different categories for picker item
            }


          </Picker>
        </View>
      )

    }
    else {
      return (null)
    }

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
              onChangeText={text => this.onChangeText(text)}
              value={this.state.text}
              placeholder='Search for News'
              onSubmitEditing={() => { this.searchLoad(this.state.searchText) }}

            />
            <TouchableOpacity style={styles.lupa}
              // when pressed, toggle the picker on and off.
              onPress={() => { this.setState({ picker: !this.state.picker }) }} >

              <Image source={Images.category} style={styles.lupaButton} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.lupa}
              // when pressed searches for articles with the key word from the api  
              onPress={() => { this.searchLoad(this.state.searchText) }} >

              <Image source={Images.lupa} style={styles.lupaButton} />
            </TouchableOpacity>


          </View>
          {
            this.showPicker()
            //shows a selection of categories if the flag is true
          }
          {
            this.loadingIndicator()
            //calls function that shows an activity indicator if the appis
            //searching or not
          }

          <View style={styles.news}>
            <SectionList
              sections={[{ title: 'News Articles', data: this.state.articles }]}

              renderItem={({ item, index }) => this.articleRenderer(item, index)}
              // renders the item and sends the method articleRenderer the nesesary parameters 
              // index is used when you touch the item, it sends you to the url site
              keyExtractor={this._keyExtractor}
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

  textField: {
    flex: 1,
    paddingTop: 0,
    paddingLeft: 25,
  },
  lupa: {
    flex: 0.2,
    aspectRatio: 2.6,
    resizeMode: 'contain',
    alignSelf: 'center',

  },
  lupaButton: {
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center',

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
    width: width - 30,
    flex: 0.4,
    backgroundColor: "#f4f4f4",
    borderColor: "#3D3C3A",
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  news: {
    paddingTop: 20,
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  }
});
