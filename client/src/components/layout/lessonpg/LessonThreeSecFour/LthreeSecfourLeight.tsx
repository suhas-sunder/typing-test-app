export default function LthreeSecfourLeight() {
  return (
    <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
      <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
        Navigating the World of Typing: Understanding Conditionals and Equality
      </h2>

      <section>
        <h3 className="mb-2 text-xl font-semibold leading-loose">
          Understanding the Keyboard:
        </h3>
        <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
          Before we delve into the world of conditionals and equality, let's
          first familiarize ourselves with the keyboard. Take a moment to
          observe the layout of your keyboard. Notice how it's divided into
          different sections: letters, numbers, symbols, and special keys. Each
          key serves a unique purpose, facilitating efficient typing.
        </p>
        <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
          As we progress, you'll discover how to navigate the keyboard with
          ease, enabling you to express your thoughts and ideas with clarity and
          precision.
        </p>
      </section>

      <section>
        <h3 className="mb-2 text-xl font-semibold leading-loose">
          Exploring Conditionals and Equality:
        </h3>
        <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
          Now, let's dive into the fascinating world of conditionals and
          equality. In programming, conditionals are statements that execute
          certain actions based on whether a specified condition is true or
          false. Equality operators, such as "==", "!=", "&&", "||", and "!",
          are used to compare values and determine their relationship.
        </p>

        <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
          For example, consider the statement:
        </p>
        <code className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
          apples !== oranges
        </code>
        <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
          In this statement, the "!=="" operator checks if the value of "apples"
          is not equal to the value of "oranges." If the values are indeed
          different, the statement evaluates to true.
        </p>

        <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
          Another example:
        </p>
        <code className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
          "1" == 1
        </code>
        <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
          In this case, the "==" operator checks if the string "1" is equal to
          the number 1. Despite the difference in data types, the statement
          evaluates to true, showcasing the concept of type coercion in
          JavaScript.
        </p>
      </section>

      <section>
        <h3 className="mb-2 text-xl font-semibold leading-loose">
          Quiz Session:
        </h3>
        <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
          <li>
            Define conditionals and explain their significance in programming.
          </li>
          <li>Provide examples of equality operators and their usage.</li>
          <li>Explain the difference between "=="" and "!=="" operators.</li>
          <li>
            Why is understanding conditionals and equality important in software
            development?
          </li>
          <li>
            How does typing proficiency contribute to expressing programming
            concepts effectively?
          </li>
        </ol>
      </section>

      <section>
        <h3 className="mb-2 text-xl font-semibold leading-loose">
          Importance of Practice:
        </h3>
        <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
          In conclusion, remember that mastery of typing, along with
          understanding programming concepts like conditionals and equality,
          requires consistent practice. Set aside time each day to practice
          typing exercises and engage in programming tutorials to reinforce your
          skills.
        </p>
        <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
          By cultivating a habit of practice, you'll not only improve your
          typing accuracy and speed but also enhance your understanding of
          programming principles and language literacy.
        </p>
      </section>

      <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
        Happy typing and coding!
      </p>
    </article>
  );
}
