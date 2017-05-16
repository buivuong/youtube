import React, {Component} from 'react'

import Admin from 'comp/navbar'
import {Breadcrumb, BreadcrumbItem} from 'comp/breadcrumb/breadcrumb'
import Conditioner from 'modules/product/conditioner'
import Category from 'modules/product/category'
import CategoryType from 'modules/product/categoryType'
import ProductMain from 'modules/product/main'
import ProductModel from 'modules/model'
import ModelSpec from 'modules/modelSpec'

import productConditionerListModel from 'models/productConditionerList'
import productCategoryListModel from 'models/productCategoryList'
import productCategoryTypeListModel from 'models/productCategoryTypeList'
import productListModel from 'models/productList'
import modelListModel from 'models/modelList'

class Product extends Component{
	constructor(props){
		super(props)
		this.state = {
			module: 'conditioners'
		}
	}
	render(){
		const conditioner = productConditionerListModel.getDetail()
		const category = productCategoryListModel.getDetail()
		const categoryType = productCategoryTypeListModel.getDetail()
		const product = productListModel.getDetail()
		const model = modelListModel.getDetail()
		return (
			<div>
				<Admin router={this.props.router}>
					<Breadcrumb>
						<BreadcrumbItem label="Conditioners" onClick={() => this.setState({module: 'conditioners'})}/>
						{this.state.module !== 'conditioners' ? <BreadcrumbItem label={conditioner.title_en} onClick={() => this.setState({module: 'categories'})}/> : null}
						{this.state.module !== 'conditioners' && this.state.module !== 'categories' ? <BreadcrumbItem onClick={() => this.setState({module: 'categoryTypes'})} label={category.name_en}/> : null}
						{this.state.module === 'products' || this.state.module === 'productModels' || this.state.module === 'models' ? <BreadcrumbItem onClick={() => this.setState({module: 'products'})} label={categoryType.title_en}/> : null}
						{this.state.module === 'productModels' || this.state.module === 'models' ? <BreadcrumbItem onClick={() => this.setState({module: 'productModels'})} label={product.name_en}/> : null}
						{this.state.module === 'models' ? <BreadcrumbItem onClick={() => {}} label={model.model}/> : null}
					</Breadcrumb>
					{this.state.module === 'conditioners' ? <Conditioner tree={this.props.tree} onSelectRow={() => this.setState({module: 'categories'})}/>:null}
					{this.state.module === 'categories' ? <Category onSelectRow={() => this.setState({module: 'categoryTypes'})}/>:null}
					{this.state.module === 'categoryTypes' ? <CategoryType onSelectRow={() => this.setState({module: 'products'})}/>:null}
					{this.state.module === 'products' ? <ProductMain onSelectRow={() => this.setState({module: 'productModels'})}/>:null}
					{this.state.module === 'productModels' ? <ProductModel onSelectRow={() => this.setState({module: 'models'})}/>:null}
					{this.state.module === 'models' ? <ModelSpec/>:null}
				</Admin>
			</div>
		)
	}
}

export default Product