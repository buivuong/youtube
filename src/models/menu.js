import Tree from 'app/tree'

const list = [
	{title: 'Trang chủ', state: 'home'},
	{title: 'Sản phẩm', state: 'product'},
]

class Menu{
	static init(){
		const menus = Tree.get('menus')
		if(menus.length === 0)
			Tree.set('menus', list)
	}
	static getList(){
		return Tree.get('menus')
	}
}

export default Menu