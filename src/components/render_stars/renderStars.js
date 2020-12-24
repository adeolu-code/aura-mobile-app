import React, { Component } from "react";
import { Icon, View } from "native-base";
import { Pressable } from "react-native";
import { Styles } from "./renderStars.style";

/**
 * 
 * @param {*} props
 * 
 *  stars [int] | totalStars [int | optional] 
 * 
 * starActive [style] | starInactive [style]
 * 
 * onClick [function]
 * 
 */
export class RenderStars extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalStars: 5
        };
    }

    updateAverageRate = (stars) => {
      this.props.onClick && this.props.onClick(stars);
    }

    renderStars(totalStars = 5, stars, starActiveStyle={},starInactiveStyle={}) {
        let elems = [];
        for (let i=1; i<= totalStars; i++){
          if (i <= Math.floor(stars)) {
            elems.push(
              <Pressable key={i} onPress={async () => {
                this.updateAverageRate(i);
              }}>
                  <Icon name="star" style={[Styles.starActive, starActiveStyle]}  />
            </Pressable>
            );
          }
          else {
            elems.push(
                <Pressable key={i} onPress={() => this.updateAverageRate(i)} key={i}>
                    <Icon name="star-outline" style={[Styles.starInactive, starInactiveStyle]} />
              </Pressable>
              );
          }
          
        }
        return elems;
      }

    render() {
        const totalStars = this.props.totalStars ? this.props.totalStars : this.state.totalStars;
        return (
            <View style={[{flexDirection: 'row', flex: 1}, this.props.style]}>
                {
                    this.renderStars(totalStars, this.props.stars, this.props.starActive, this.props.starInactive)
                }
            </View>
            
        );
    }
}