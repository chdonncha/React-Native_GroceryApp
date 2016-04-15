/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 'use strict';
 var React = require('react-native');

const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const { AppRegistry, StyleSheet, Text, View, ListView, AlertIOS } = React;

const Firebase = require('firebase');
const styles = require('./styles.js')



class GroceryApp extends React.Component {
  _renderItem(item) {
    return (
      <ListItem item={item} onPress={() => {}} />
    );
  }

  constructor(props) {
  super(props);
  this.itemsRef = new Firebase("https://<YOURFIREBASE>.firebaseio.com");

  this.state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
  };
}

listenForItems(itemsRef) {
  itemsRef.on('value', (snap) => {
    // get children as an array
    var items = [];
    snap.forEach((child) => {
      items.push({
        title: child.val().title,
        _key: child.key()
      });
    });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items)
    });
  });
}

componentDidMount() {
  //this.setState({
    //dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
  //})
  this.listenForItems(this.itemsRef);
}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="Grocery List" />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}/>
        <ActionButton title="Add" onPress={() => {}} />
      </View>
    );
  }
}

AppRegistry.registerComponent('GroceryApp', () => GroceryApp);
