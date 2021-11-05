import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator
} from 'react-native';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.isLoading
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      isLoading: nextProps.isLoading
    };
  }

  render() {
    return (
      <View
        transparent={true}
        animationType={'none'}
        visible={this.state.isLoading}
        style={{ zIndex: 1100 }}
        >
        <View >
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={this.state.loading} style={{color: 'cadetblue'}} />

            {/* If you want to image set source here */}
             <Image
              source={require('../assets/loader.gif')}
              style={{ height: 80, width: 80 }}
              resizeMode="contain"
              resizeMethod="resize"
            /> 
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loading
