/* global qq */
import React from 'react'
import { Control } from './components'

export default class CustomControl extends Control {
  static defaultProps = {
    position: qq.maps.ControlPosition.TOP_LEFT,
    style: {}
  }

  get events () {
    return [
      'change'
    ]
  }

  get options () {
    return [
      'position',
      'style'
    ]
  }

  getControl () {
    const { map } = this.props
    if (!map || !this.controlNode) return
    const options = this.getOptions(this.options)
    const mapControls = map.controls[options.position]
    mapControls.push(this.controlNode)
    this.control = this.controlNode
    this.control.index = mapControls.length
    return this.control
  }

  handleChange = value => {
    const { onChange } = this.props
    onChange && onChange(value)
  }

  render () {
    const { style } = this.props
    return (
      <div ref={node => (this.controlNode = node)} style={{
        ...style,
        position: 'absolute'
      }} >
        <div className="tools">
          <button className="tc-15-btn weak" onClick={() => this.handleChange(0)}><i className="icon-pen" />编辑</button>
          <button className="tc-15-btn weak selected" onClick={() => this.handleChange(1)}><i className="icon-pointer" />选择</button>
        </div>
      </div>
    )
  }
}
