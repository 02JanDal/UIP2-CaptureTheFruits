import { FC, useEffect, useState } from "react";

/*
 * A component is just a function that returns some JSX (basically HTML with
 * JavaScript). They can receive properties as an object. Since we're using
 * TypeScript we want to explicitly type the component variable using `FC`,
 * which is basically just an alias for a type of function taking some
 * properties and returning some JSX. If we want the component to take some
 * properties we need to specify their types in the template parameter to the
 * `FC` type as shown with the `message` property.
 */
const ChildComponent: FC<{ message: string }> = (props) => {
  /*
   * As mentioned, JSX is basically just HTML but we can also write JavaScript
   * inside it. In this example we just insert the value of the expression
   * `props.message` inside the HTML. There are no limits to how complex the
   * JavaScript inside the JSX can be, but it makes sense to keep it simple and
   * to perform any complex computations before the return statement.
   */
  return <p>{props.message}</p>;
};

/*
 * If the component does not take any parameters we can leave the `FC` template
 * parameter and the `props` function argument out.
 */
const ParentComponent: FC = () => {
  /*
   * The entire function body of a component is run each time the component is
   * rendered/updated. This means that values we assign to plain variables will
   * get reset. If we want to persist some state between these updates we do so
   * using `useState`.
   *
   * `useState` is a "hook", a function we can use inside our component that
   * contains some logic. There are a number of hooks provided by React, and
   * it's also possible to create your own hooks by just writing functions.
   *
   * `useState` returns a two-item array, the first item is the current value
   * and the second is a function to change this value. Note that you *cannot*
   * change the state by assigning a new value to the first item!
   *
   * The `useState` hook takes a single argument which is the initial value.
   */
  const [counter, setCounter] = useState(0);

  /*
   * Another commonly used hook is `useEffect` (useful for side effects
   * like loading data or setting up non-React libraries), which you pass a
   * function that gets run when the component is mounted and unmounted, and
   * optionally also when some values (state or properties) change.
   */
  useEffect(
    () => {
      console.log("I just was mounted!");
      /*
       * The code to run on un-mount is returned as a function from the code
       * that runs on mount.
       */
      return () => {
        console.log("I just was un-mounted!");
      };
    },
    /*
     * The array lists the dependencies of the effect, when they change the
     * effect gets re-executed. In this case there are no dependencies.
     */
    []
  );

  /*
   * We are not limited to directly using the properties and state when passing
   * information to our child components, it's also possible to calculate some
   * other variable first. If `counter` changes then `lotsOfClicks` will also
   * change.
   */
  const lotsOfClicks = counter > 5;
  const clickArray = new Array(counter);

  /*
   * Note that we aren't limited to using JSX in the return statement, we can
   * also assign it to variables and later use that.
   */
  const footer = <footer>I'm a footer!</footer>;

  /*
   * Note that while in this example we just have a single return statement
   * returning some JSX it is actually possible to have multiple return
   * statements. For example, we might have an early return that just returns
   * a loading spinner if our data isn't loaded yet. It's also possible to
   * return `null` if we don't want to render anything at all.
   */
  return (
    <div>
      {/*
       * On both standard HTML elements and on React components we can specify
       * properties just like we'd do in HTML, `property="value"`. However, it
       * is also possible to pass in arbitrary JavaScript using the
       * JSX-specific `property={value}` syntax.
       * It is however recommended keeping the JavaScript in JSX brief, if you
       * have more complex logic it usually makes sense to put it in the
       * non-JSX part of your component, or even in your own hook.
       */}
      <button
        type="button"
        onClick={() => {
          setCounter(counter + 1);
        }}
      />

      {/*
       * Possibly the best part about React is that it manages updates of
       * child components for us as needed. Here, we set the `message`
       * property of our child component based on a value that we might
       * change in this component. If we change it React will automatically
       * re-render the child component as well.
       */}
      <ChildComponent
        message={`You have clicked the button ${counter} times`}
      />

      {/*
       * It is also possible to render some JSX conditionally based on some
       * value. Just as with properties React will automatically update the
       * DOM as needed to insert or remove the child nodes (a node is either
       * an HTML element, a React component or some plain text).
       * Note that we here make use of the fact that React handles `null` as
       * "nothing", which means that no node will be inserted.
       */}
      {lotsOfClicks ? <p>That's a lot of clicks on the button!</p> : null}

      <ul>
        {/*
         * We can also render a list of child nodes based on a JavaScript
         * array using the `map` function. What basically happens here is that
         * we "map" the values in the array to an array of components
         * (something like `[<li>Click 1</li>, <li>Click 2</li>]`, which
         * you actually could write yourself as well though of course then it
         * wouldn't be dynamic based on the array) and then render that array
         * of components.
         *
         * Note the special `key={}` attribute here, React requires it when
         * using `map` like this so that it knows which node is which, even if
         * the order of the array changes. While not so important in many
         * cases and basically useless when just using the array index as key
         * like here (normally you'd want to use some "stable" identifier, like
         * the ID of the object in the database), it makes it possible for
         * React to keep elements the same during re-render if they keep their
         * key. That way things like `useState` will be kept correctly.
         */}
        {clickArray.map((value, index) => (
          <li key={index}>Click {value}</li>
        ))}
      </ul>

      {/*
       * Inserting the nodes stored in a variable is as simple as this:
       */}
      {footer}
    </div>
  );
};

/*
 * In order for this component to be available to other files we need to export
 * it. Now another file can say `import ParentComponent from "ReactCheatsheet"`.
 */
export default ParentComponent;
