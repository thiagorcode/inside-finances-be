CREATE TRIGGER SummaryTransactions
AFTER INSERT
   ON gen.transactions  FOR EACH ROW
BEGIN
	
	DECLARE reqYear INT;
	DECLARE reqYearMonth VARCHAR(7);
	
	SET reqYear = YEAR(NEW.`date`);
	SET reqYearMonth = CONCAT(YEAR(NEW.`date`), "-", DATE_FORMAT(NEW.`date`, "%m"));

	INSERT INTO das.summary_transactions
	(id, value, `year`, yearMonth, `date`, `type`, userId, categoryId)
	VALUES(uuid(), NEW.`value`, @REQ_YEAR, @REQ_YEAR_MONTH, NEW.`date` , NEW.`type` , NEW.`userId` , NEW.categoryId)
   ON DUPLICATE KEY UPDATE value = value + NEW.`value`;

END;

DROP trigger SummaryTransactions