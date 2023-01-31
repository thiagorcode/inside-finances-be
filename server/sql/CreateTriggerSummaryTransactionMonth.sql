CREATE TRIGGER `SummaryTransactionsMonth` AFTER INSERT ON `transactions` FOR EACH ROW BEGIN
	DECLARE recipe_value INT DEFAULT 0;
	DECLARE expense_value INT DEFAULT 0;
	DECLARE total_value INT DEFAULT 0;

 	DECLARE type_recipe VARCHAR(1) DEFAULT '+'; 
	DECLARE type_expense VARCHAR(1)DEFAULT '-';
	
	SET @REQ_YEAR = DATE_FORMAT(NEW.`date`, '%Y');
	SET @REQ_YEAR_MONTH = CONCAT(DATE_FORMAT(NEW.`date`, '%Y'), "-", DATE_FORMAT(NEW.`date`, "%m"));
	
	IF NEW.`type` = type_recipe THEN 
		SET recipe_value = NEW.value;
    ELSEIF NEW.`type` = type_expense 
   		THEN SET expense_value = NEW.value;
	END IF;

	SET total_value = recipe_value - expense_value;

	INSERT INTO das.summary_transactions_month 
	( recipeValue, expenseValue, total , `year`, yearMonth, userId)
	VALUES( recipe_value, expense_value, total_value, @REQ_YEAR, @REQ_YEAR_MONTH , NEW.`userId` ) 
	  ON DUPLICATE KEY UPDATE 
	 recipeValue = recipeValue + VALUES(recipeValue),
	 expenseValue = expenseValue + VALUES(expenseValue),
	 total = total + VALUES(recipeValue) - VALUES(expenseValue);


END