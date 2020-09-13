import React, { Component } from "react";
import { Icon, View } from "native-base";
import { Pressable } from "react-native";
import { Styles } from "./renderStars.style";

export class RenderStars extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalStars: 5
        };
    }

    renderStars(totalStars = 5, stars, style={}) {
        let elems = [];
        for (let i=1; i<= totalStars; i++){
          if (i <= Math.floor(stars)) {
            elems.push(
              <Pressable key={i} onPress={async () => {
                this.updateAverageRate(i);
              }}>
                  <Icon name="star" style={[Styles.starActive, style.starActive]}  />
            </Pressable>
            );
          }
          else {
            elems.push(
                <Pressable key={i} onPress={() => this.updateAverageRate(i)} key={i}>
                    <Icon name="star" style={[Styles.starInactive, style.starInactive]} />
              </Pressable>
              );
          }
          
        }
        console.log("star elems", elems);
        return elems;
      }

    render() {
        const totalStars = this.props.totalStars ? this.props.totalStars : this.state.totalStars;
        return (
            <View style={[{flexDirection: 'row', flex: 1}]}>
                {
                    this.renderStars(totalStars, this.props.stars, this.props.style)
                }
            </View>
            
        );
    }
}