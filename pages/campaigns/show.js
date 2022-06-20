import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager,
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "O gerente criou essa campanha e pode criar requisições para sacar o dinheiro.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "Você dever contribuir com pelo menos este valor para ser um aprovador.",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "Uma requisição visa sacar dinheiro do contrato. Requisições devem ser aprovadas pelos aprovadores",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description: "Número de pessoas que já doaram para esta campanha",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "O balanço é quanto dinheiro restante esta camapnha tem para gastar",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>Ver Requisições</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
