import React, { Component } from 'react';

export class Filters extends Component {
  render() {
    return (
        <div id="filters">
            <svg xmlns="http://www.w3.org/2000/svg"  version="1.1">
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