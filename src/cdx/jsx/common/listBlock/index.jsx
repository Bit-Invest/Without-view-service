import React from 'react'
import mixins from '@cdx/mixins/'

import './style.scss'

export default class ListBlock extends React.Component {
  state = {
    adding: false,
    editingIndex: false,
  };

  setIndexEditing = (index) => {
    this.setState({
      editingIndex: index,
      adding: false,
    });
  }

  renderAddingKeys() {
    if (!this.state.adding)
      return [];

    const addKeysForm = this.props
      .blockRender({
        groupName: this.props.groupName,
        status: 'ADDING',
        methods: {
          add: this.props.methods.add,
          toggleAdding: this.toggleAdding,
          reload: this.props.methods.reload,
        },
      });

    return(
      <div class="addingParent">
        {addKeysForm}
      </div>
    );
  }

  renderAddingProduct() {
    if (!this.state.adding)
      return [];

    const addProductForm = this.props
      .blockRender({
        groupName: this.props.groupName,
        status: 'ADDING',
        keys: this.props.keys,
        methods: {
          add: this.props.methods.add,
          toggleAdding: this.toggleAdding,
          reload: this.props.methods.reload,
        },
      });

    return(
      <div class="addingParent">
        {addProductForm}
      </div>
    );
  }

  renderListKeys = () => {
    const keys = this.props.reduxState;
    const keysNoLoaded = mixins.common.dataNoLoaded([keys]);

    if (keysNoLoaded[1]) return keysNoLoaded[1];

    const resList = keys
      .filter(this.props.filter || (() => true))
      .map((curKeys, index) => 
        this.props.blockRender({
          ...curKeys,
          typelist: this.props.typelist,
          status: curKeys[this.props.uniqProperty] === this.state.editingIndex ? 'EDITING' : 'ACTIVE',
          methods: {
            setIndexEditing: this.setIndexEditing.bind(this, curKeys[this.props.uniqProperty]),
            clearIndexEditing: this.setIndexEditing.bind(this, false),
            remove: this.props.methods.remove,
            edit: this.props.methods.edit,
            reload: this.props.methods.reload,
          },
        }, index)
      );

    return [
      this.renderAddingKeys(),
      resList,
    ];
  }

  renderListProducts = () => {
    const products = this.props.reduxState;
    const productsNoLoaded = mixins.common.dataNoLoaded([products]);

    if (productsNoLoaded[1]) return productsNoLoaded[1];

    const resList = products
      .filter(this.props.filter || (() => true))
      .map((curProduct, index) => 
        this.props.blockRender({
          ...curProduct,
          typelist: this.props.typelist,
          status: curProduct[this.props.uniqProperty] === this.state.editingIndex ? 'EDITING' : 'ACTIVE',
          methods: {
            setIndexEditing: this.setIndexEditing.bind(this, curProduct[this.props.uniqProperty]),
            clearIndexEditing: this.setIndexEditing.bind(this, false),
            remove: this.props.methods.remove,
            edit: this.props.methods.edit,
            reload: this.props.methods.reload,
          },
        }, index)
      );

    return [
      this.renderAddingProduct(),
      resList,
    ];
  }

  toggleAdding = () => 
    this.setState({
      adding: !this.state.adding,
      editingIndex: false,
    });

  render() {
    const { atopClass } = this.props;

    return(
      <div className={`listBlock ${atopClass?atopClass:''}`}>
        <div className="head">
          {this.props.texts.title && (
            <div className="title">
              <div>{this.props.texts.title}</div>
              <div className="reload" onClick={this.props.methods.reload}></div>
            </div>
          )}
          {this.props.texts.addButtonText && (
            <div className="addButton" onClick={this.toggleAdding}>{this.props.texts.addButtonText}</div>
          )}
        </div>
        <div className="list">
          {({
            'renderListKeys': this.renderListKeys,
            'renderListProducts': this.renderListProducts,
          })[this.props.renderFn]()}
        </div>
      </div>
    )
  }
}