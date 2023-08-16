const menu = {
    cafe: { descricao: "Café", valor: 3.00 },
    chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
    suco: { descricao: "Suco Natural", valor: 6.20 },
    sanduiche: { descricao: "Sanduíche", valor: 6.50 },
    queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
    salgado: { descricao: "Salgado", valor: 7.25 },
    combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
    combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 }
};

class CaixaDaLanchonete {

    constructor(cardapio) {
        this.cardapio = cardapio;
        this.descontoDinheiro = 0.05;
        this.acrescimoCredito = 0.03;
        this.formaPagamento = ['dinheiro', 'debito', 'credito'];
    }

    calcularValorDaCompra(metodoDePagamento, itens) {

        if (!this.formaPagamento.includes(metodoDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let valorTotal = 0;
        let temCafe = false;
        let temChantily = false;
        let temSanduiche = false;
        let temQueijo = false;

        for (const itemPedido of itens) {
            const [item, quantidade] = itemPedido.split(',');
            const cardapioItem = menu[item];
            if (!cardapioItem) {
                return 'Item inválido!';
            }

            if (quantidade == 0) {
                return 'Quantidade inválida!';
            }

            valorTotal += cardapioItem.valor * quantidade;

            if (item === 'cafe')
                temCafe = true;

            if (item === 'chantily')
                temChantily = true;

            if (item === 'sanduiche')
                temSanduiche = true;

            if (item === 'queijo')
                temQueijo = true;
        }

        if (temChantily && !temCafe || temQueijo && !temSanduiche) {
            return 'Item extra não pode ser pedido sem o principal';
        }

        if (metodoDePagamento === 'dinheiro') {
            valorTotal -= valorTotal * this.descontoDinheiro;
        } else if (metodoDePagamento === 'credito') {
            valorTotal += valorTotal * this.acrescimoCredito;
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
