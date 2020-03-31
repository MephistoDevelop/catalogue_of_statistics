import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { NavBar } from './NavBar';
import { RandomList } from './RandomList';
import { RecipeCategories } from './RecipeCategories';
import { RecipeDetails } from './RecipeDetails';
import RecipesList from './RecipesList';
import { Home } from './Home';
import FindedMeal from './FindedMeal';
import { SetCategories, SetRandom } from '../actions/actions';

const App = (props) => {
  const { Categories, Random } = props;
  const { mealCategories, mealRandom } = props;

  useEffect(() => {
    Categories();
    Random();
  }, []);

  return (
    <div id="main-container">
      <Router>
        <NavBar />
        <div id="content">
          <Route path="/home" component={() => <Home />} />
          <Route path="/random" component={() => <RandomList randomMeals={mealRandom} />} />
          <Route path="/details" component={() => <RecipeDetails />} />
          <Route path="/categories" component={() => <RecipeCategories categories={mealCategories} />} />
          <Route path="/meals" component={() => <RecipesList />} />
          <Route path="/finded" component={() => <FindedMeal />} />
        </div>
      </Router>
    </div>
  );
};

App.propTypes = {
  Categories: propTypes.func.isRequired,
  Random: propTypes.func.isRequired,
  mealCategories: propTypes.array.isRequired,
  mealRandom: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  mealCategories: state.mealCategories,
  mealRandom: state.mealRandom,
});

const mapDispatchToProps = (dispatch) => ({
  Categories: () => dispatch(SetCategories()),
  Random: () => dispatch(SetRandom()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
