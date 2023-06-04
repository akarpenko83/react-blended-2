import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    showBtn: false,
    isEmpty: false,
    images: [],
    currentPage: 1,
    value: '',
  };

  componentDidUpdate(_, prevState) {
    const { value, currentPage } = this.state;

    if (value !== prevState.value || currentPage !== prevState.currentPage) {
      ImageService.getImages(value, currentPage).then(data => {
        if (!data.photos.length) {
          this.setState({ isEmpty: true });
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...data.photos],
          showBtn: currentPage < Math.ceil(data.total_results / 15),
        }));
      });
    }
  }

  nextPage = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  handleSubmit = value => {
    console.log('gallery', value);
    this.setState({
      value,
      currentPage: 1,
      images: [],
      showBtn: false,
      isEmpty: false,
    });
  };
  render() {
    const { isEmpty, images, showBtn } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {images.map(({ id, avg_color, src, alt }) => {
            return (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}

        {showBtn && <Button onClick={this.nextPage} >Load more</Button>}
      </>
    );
  }
}
