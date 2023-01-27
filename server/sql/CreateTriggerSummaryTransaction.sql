CREATE TRIGGER SummaryTransactions
AFTER INSERT
   ON gen.transactions  FOR EACH ROW
BEGIN
	
	SET @REQ_YEAR = YEAR(NEW.`date`);
	SET @REQ_YEAR_MONTH = CONCAT(YEAR(NEW.`date`), "-", DATE_FORMAT(NEW.`date`, "%m")) ;
	
	INSERT INTO das.summary_transactions
	(id, value, `year`, yearMonth, `date`, `type`, userId, categoryId)
	VALUES(uuid(), NEW.`value`, @REQ_YEAR, @REQ_YEAR_MONTH, NEW.`date` , NEW.`type` , NEW.`userId` , NEW.categoryId);
   

END;

DROP trigger SummaryTransactions