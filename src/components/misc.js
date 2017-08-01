import React, { Component } from 'react';

export default class Filters extends Component {
  render() {
    return (
        <div id="filters">
            <svg>
                <defs>
                    <filter id="blur">
                        <feGaussianBlur stdDeviation="8"/>
                    </filter>
                </defs>
            </svg>
        </div>
    );
  }
}