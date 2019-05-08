<template>
    <table>
        <thead>
            <tr>
                <th v-for="(item,index) in group" :key="index">{{item}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in sku" :key="index">
                <td v-for="(items,indexs) in item" :key="indexs">{{items}}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    props:['data'],
    data(){
        return {
            group:[],
            sku:[]
        }
    },
    mounted(){
        this.group=this.data.map(item=>item.group)
        this.accretion()
        this.sku=this.descartes(this.data.map(item=>{
            return item.params.map(items=>{
                return items
            })
        }))
    },
    methods:{
        accretion(){
            this.group.push('库存')
            this.group.push('单价')
        },
        descartes(array){
            if( array.length < 2 ) return array[0] || [];

            return [].reduce.call(array, function(col, set) {
                let res = [];
                col.forEach(function(c) {
                    set.forEach(function(s) {
                        let t = [].concat( Array.isArray(c) ? c : [c] );
                        t.push(s);
                        t.push(0)//库存
                        t.push(0)//单价
                        res.push(t);
                        
                })});
                return res;
            });
        }
    }
}
</script>
<style lang="scss" scoped>
table{
    width:100%;
    border-collapse:collapse;
    td,th{
        border-collapse:collapse;
        border: 1px solid #eee;
        text-align:left;
        box-sizing: border-box;
        padding: 3px 0 3px 7px;
    }
}
</style>
