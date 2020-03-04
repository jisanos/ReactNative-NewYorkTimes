/*
*
* Assignment 3
* Starter Files
*
* CS47
* Oct, 2018
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, SafeAreaView, View, FlatList, Text, Linking } from 'react-native'
import { material } from 'react-native-typography' //consider using this!
import { Metrics, Colors } from '../Themes'

export default class News extends Component {
  constructor(props){
    super(props)
  }

  render() {

    return (
      <View>
        <Text style={styles.itemTitle}>
          {this.props.item.title}
        </Text>

        <Text style={styles.itemText}>
          {this.props.item.snippet}
        </Text>

        <Text style={styles.itemAuthor}>
          {this.props.item.byline}
        </Text>

        <Text style={styles.itemID}>
          {this.props.item.date}
        </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {

  },
  itemText: {
    fontSize: 14,
    
  },
  itemID: {
    paddingBottom: 20,
    fontSize: 12,
    color:'#999999',
    
  },
  itemAuthor:{
    fontWeight:'500',
    fontSize: 14,
  },
  itemTitle: {
    fontSize: 26,
    //fontWeight:'bold',
  },
});
