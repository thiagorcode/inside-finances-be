CREATE TRIGGER SummaryTransactionsMonthUpdate
AFTER UPDATE
   ON gen.transactions FOR EACH ROW
BEGIN
	DECLARE reqYear INT;
	DECLARE reqYearMonth VARCHAR(7);

	SET reqYear = YEAR(NEW.`date`);
	SET reqYearMonth = CONCAT(YEAR(NEW.`date`), "-", DATE_FORMAT(NEW.`date`, "%m"));
	
	INSERT INTO das.summary_transactions_month 
	( value, `year`, yearMonth, `type`, userId)
	VALUES( NEW.`value`, @REQ_YEAR, @REQ_YEAR_MONTH , NEW.`type` , NEW.`userId` ) 
	  ON DUPLICATE KEY UPDATE value = value + NEW.`value`;

END;

DROP trigger SummaryTransactionsMonth